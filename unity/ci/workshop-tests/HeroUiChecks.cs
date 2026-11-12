using System;
using DndVtt.UnityPrototype;

internal static class HeroUiChecks
{
    public static int Run()
    {
        int checks = 0;
        void Expect(string input, string result)
        {
            string actual = CharacterSpeedDisplay.Format(input);
            if (actual != result)
                throw new InvalidOperationException("Speed display for '" + input + "': expected '" + result + "', got '" + actual + "'");
            checks++;
        }
        Expect(null, "9 м / 30 фт");
        Expect("30 футов", "9 м / 30 фт");
        Expect("35 футов", "10,5 м / 35 фт");
        Expect("40 ft", "12 м / 40 фт");
        Expect("60", "18 м / 60 фт");
        Expect("6 м", "6 м / 20 фт");
        Expect("7,5 м", "7,5 м / 25 фт");
        Expect("10.5 метра", "10,5 м / 35 фт");
        Expect("0 фт", "0 м / 0 фт");
        Expect("Скорость полёта 60 фт", "Скорость полёта 60 фт");
        Expect("По решению мастера", "По решению мастера");
        return checks;
    }
}
