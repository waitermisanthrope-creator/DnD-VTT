function renderNotes() {
  if (typeof currentCharacter !== 'undefined' && typeof currentChar === 'undefined') {
  window.currentChar = currentCharacter;
}

  if (!currentChar.folders) currentChar.folders = [];
  if (!currentChar.activeFolderId && currentChar.folders.length > 0) {
    currentChar.activeFolderId = currentChar.folders[0].id;
  }

  var activeFolder = null;
  for (var i = 0; i < currentChar.folders.length; i++) {
    if (currentChar.folders[i].id === currentChar.activeFolderId) { activeFolder = currentChar.folders[i]; break; }
  }

  var container = document.getElementById('notesList');
  var titleElem = document.getElementById('currentFolderTitle');
  if (!container || !titleElem) return;

  if (!activeFolder) {
    container.innerHTML = '<div style="color: #777; text-align: center;">Создайте или выберите папку</div>';
    titleElem.innerText = 'Заметки';
    return;
  }

  titleElem.innerText = activeFolder.name;
  if (activeFolder.notes.length === 0) {
    container.innerHTML = '<div style="color: #777; text-align: center;">В этой папке пока нет заметок</div>';
    return;
  }

  var html = '';
  for (var j = 0; j < activeFolder.notes.length; j++) {
    var n = activeFolder.notes[j];
    html += '<div class="note-card">' +
      '<input type="text" value="' + escapeHtml(n.title || '') + '" placeholder="Заголовок..." oninput="updateNote(' + j + ', \'title\', this.value)">' +
      '<textarea placeholder="Текст заметки..." oninput="updateNote(' + j + ', \'text\', this.value)">' + escapeHtml(n.text || '') + '</textarea>' +
      '<div style="text-align: right; margin-top: 4px;">' +
        '<button class="btn-del" onclick="deleteNote(' + j + ')">Удалить</button>' +
      '</div>' +
    '</div>';
  }
  container.innerHTML = html;
}

function renderFolders() {
  var container = document.getElementById('folderList');
  if (!container) return;
  if (!currentChar.folders) currentChar.folders = [];

  var html = '';
  for (var i = 0; i < currentChar.folders.length; i++) {
    var f = currentChar.folders[i];
    var activeClass = (f.id === currentChar.activeFolderId) ? 'active' : '';
    var deleteBtn = currentChar.folders.length > 1 ? '<span onclick="deleteFolder(event, \'' + f.id + '\')" style="margin-left:4px; opacity:0.6;">✕</span>' : '';
    html += '<div class="folder-chip ' + activeClass + '" onclick="selectFolder(\'' + f.id + '\')">' +
      '<span>' + escapeHtml(f.name || '') + '</span>' + deleteBtn +
    '</div>';
  }
  container.innerHTML = html;
  renderNotes();
}

function selectFolder(folderId) {
  currentChar.activeFolderId = folderId || '';
  renderFolders();
}

function addFolder() {
  var input = document.getElementById('newFolderName');
  if (!input) return;
  var name = input.value.trim();
  if (!name) return;
  if (!currentChar.folders) currentChar.folders = [];

  var newFolder = { id: 'f_' + Date.now(), name: name, notes: [] };
  currentChar.folders.push(newFolder);
  currentChar.activeFolderId = newFolder.id;
  input.value = '';
  renderFolders();
  autoSaveCurrentCharacter();
}

function deleteFolder(event, folderId) {
  if (event && event.stopPropagation) event.stopPropagation();
  if (!confirm('Удалить папку и все её заметки?')) return;
  currentChar.folders = currentChar.folders.filter(function(f) { return f.id !== folderId; });
  if (currentChar.activeFolderId === folderId) {
    currentChar.activeFolderId = currentChar.folders[0] ? currentChar.folders[0].id : '';
  }
  renderFolders();
  autoSaveCurrentCharacter();
}

function addNote() {
  var activeFolder = null;
  for (var i = 0; i < currentChar.folders.length; i++) {
    if (currentChar.folders[i].id === currentChar.activeFolderId) { activeFolder = currentChar.folders[i]; break; }
  }
  if (!activeFolder) { alert('Сначала выберите или создайте папку!'); return; }
  activeFolder.notes.push({ id: Date.now(), title: '', text: '' });
  renderNotes();
  autoSaveCurrentCharacter();
}

function updateNote(index, field, value) {
  var activeFolder = null;
  for (var i = 0; i < currentChar.folders.length; i++) {
    if (currentChar.folders[i].id === currentChar.activeFolderId) { activeFolder = currentChar.folders[i]; break; }
  }
  if (activeFolder && activeFolder.notes[index]) {
    activeFolder.notes[index][field] = value;
    autoSaveCurrentCharacter();
  }
}

function deleteNote(index) {
  var activeFolder = null;
  for (var i = 0; i < currentChar.folders.length; i++) {
    if (currentChar.folders[i].id === currentChar.activeFolderId) { activeFolder = currentChar.folders[i]; break; }
  }
  if (activeFolder) {
    activeFolder.notes.splice(index, 1);
    renderNotes();
    autoSaveCurrentCharacter();
  }
}
