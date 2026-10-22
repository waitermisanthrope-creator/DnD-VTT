using System;
using System.Collections.Generic;
using System.Globalization;
using System.Numerics;
using System.Text.RegularExpressions;

namespace DndVtt.UnityPrototype
{
    // Quantities are never expanded into a list of dice. Memory depends on seven die types,
    // not the requested count. BigInteger also prevents overflow in cumulative totals.
    public sealed class DiceRollRequest
    {
        private static readonly int[] Supported={4,6,8,10,12,20,100};
        private readonly Dictionary<int,BigInteger> remaining=new Dictionary<int,BigInteger>();
        private readonly Dictionary<int,int> inFlight=new Dictionary<int,int>();
        public BigInteger Count { get;private set; }
        public BigInteger Completed { get;private set; }
        public BigInteger Total { get;private set; }
        public bool Pending=>Completed<Count;
        private DiceRollRequest() { }
        public static DiceRollRequest Parse(string expression)
        {
            if(string.IsNullOrWhiteSpace(expression))throw new FormatException("Введите бросок, например 7d20 + 3d6 + 1d8.");
            var request=new DiceRollRequest();
            foreach(string term in expression.Split('+')) {
                var match=Regex.Match(term,@"^\s*([0-9]*)\s*[dDдД]\s*(4|6|8|10|12|20|100)\s*$",RegexOptions.CultureInvariant);
                if(!match.Success)throw new FormatException("Нужен формат 7d20 + 3d6 + 1d8; доступны d4, d6, d8, d10, d12, d20, d100.");
                BigInteger quantity=match.Groups[1].Length==0?BigInteger.One:BigInteger.Parse(match.Groups[1].Value,CultureInfo.InvariantCulture);
                if(quantity<=0)throw new FormatException("Количество кубиков должно быть положительным.");
                int sides=int.Parse(match.Groups[2].Value,CultureInfo.InvariantCulture);
                request.remaining.TryGetValue(sides,out var old);request.remaining[sides]=old+quantity;request.Count+=quantity;
            }
            return request;
        }
        // Reserve a bounded batch; percentile dice consume two physical body slots.
        public int[] TakeBatch(int bodySlots)
        {
            if(bodySlots<2)throw new ArgumentOutOfRangeException(nameof(bodySlots));
            foreach(var active in inFlight)if(active.Value!=0)throw new InvalidOperationException("Предыдущая партия ещё не завершена.");
            var batch=new List<int>();
            foreach(int sides in Supported) {
                if(!remaining.TryGetValue(sides,out var left))continue;
                int cost=sides==100?2:1;
                while(left>0&&bodySlots>=cost) { batch.Add(sides);left--;bodySlots-=cost;inFlight.TryGetValue(sides,out int active);inFlight[sides]=active+1; }
                remaining[sides]=left;
            }
            return batch.ToArray();
        }
        public void Accept(int sides,int value)
        {
            if(!inFlight.TryGetValue(sides,out int active)||active<1||value<1||value>sides||Completed>=Count)throw new ArgumentOutOfRangeException(nameof(value));
            inFlight[sides]=active-1;Completed++;Total+=value;
        }
    }
}
