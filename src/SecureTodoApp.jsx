import React, { useState, useEffect } from 'react';

export default function SecureTodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDesc, setEditDesc] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('secureTodos');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse todos');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('secureTodos', JSON.stringify(todos));
  }, [todos]);

  const sanitizeInput = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  const addTodo = () => {
    const trimmedInput = input.trim();
    const trimmedDesc = description.trim();
    
    if (trimmedInput.length === 0) return;
    if (trimmedInput.length > 200) {
      alert('Le titre ne peut pas dépasser 200 caractères');
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: sanitizeInput(trimmedInput),
      description: sanitizeInput(trimmedDesc),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos([...todos, newTodo]);
    setInput('');
    setDescription('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
    setEditDesc(todo.description);
  };

  const saveEdit = () => {
    if (editText.trim().length === 0) return;
    
    setTodos(todos.map(todo =>
      todo.id === editingId
        ? { ...todo, title: sanitizeInput(editText.trim()), description: sanitizeInput(editDesc.trim()) }
        : todo
    ));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditDesc('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addTodo();
    }
  };

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);
    
    const matchesSearch = searchTerm === '' ||
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">
             SecureTodo
          </h1>
          <p className="text-gray-600 text-sm">
            Application DevSecOps - Gestion de tâches sécurisée
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.active}</div>
            <div className="text-sm text-gray-600">En cours</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Complétées</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la tâche *
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ex: Préparer la présentation DevSecOps"
                maxLength="200"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                {input.length}/200 caractères
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optionnel)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Détails supplémentaires..."
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={addTodo}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 font-medium"
            >
              + Ajouter la tâche
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="🔍 Rechercher une tâche..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {['all', 'active', 'completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filter === f
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f === 'all' ? 'Toutes' : f === 'active' ? 'En cours' : 'Complétées'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              {searchTerm ? 'Aucune tâche trouvée' : 'Aucune tâche pour le moment'}
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                className={`bg-white rounded-lg shadow-lg p-4 transition ${
                  todo.completed ? 'opacity-75' : ''
                }`}
              >
                {editingId === todo.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                        todo.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-indigo-500'
                      }`}
                    >
                      {todo.completed && <span className="text-white text-sm">✓</span>}
                    </button>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-medium ${
                          todo.completed
                            ? 'line-through text-gray-500'
                            : 'text-gray-900'
                        }`}
                      >
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {todo.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Créée le {new Date(todo.createdAt).toLocaleString('fr-FR')}
                      </p>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => startEditing(todo)}
                        className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Modifier"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Supprimer"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

       
      </div>
    </div>
  );
}
