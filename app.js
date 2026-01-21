/**
 * TODO App - Application de gestion de tâches sécurisée
 * @version 1.0.0
 * @description Application avec validation des entrées et protection XSS
 */

// ===== Configuration =====
const CONFIG = {
    MAX_TODOS: 1000,
    MAX_TODO_LENGTH: 200,
    STORAGE_KEY: 'todos_devsecops',
    FILTERS: {
        ALL: 'all',
        ACTIVE: 'active',
        COMPLETED: 'completed'
    }
};

// ===== État de l'application =====
let todos = [];
let currentFilter = CONFIG.FILTERS.ALL;

// ===== Éléments DOM =====
const elements = {
    todoForm: document.getElementById('todo-form'),
    todoInput: document.getElementById('todo-input'),
    todoList: document.getElementById('todo-list'),
    emptyState: document.getElementById('empty-state'),
    activeCount: document.getElementById('active-count'),
    clearCompleted: document.getElementById('clear-completed'),
    filterButtons: document.querySelectorAll('.filter-btn')
};

// ===== Utilitaires de sécurité =====

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML
        .trim()
        .substring(0, CONFIG.MAX_TODO_LENGTH);
}

/**
 * Validate todo data structure
 * @param {Object} todo - Todo object to validate
 * @returns {boolean} True if valid
 */
function isValidTodo(todo) {
    return todo &&
        typeof todo.id === 'string' &&
        typeof todo.text === 'string' &&
        typeof todo.completed === 'boolean' &&
        todo.text.length > 0 &&
        todo.text.length <= CONFIG.MAX_TODO_LENGTH;
}

// ===== Gestion du LocalStorage =====

/**
 * Load todos from localStorage with validation
 * @returns {Array} Array of validated todos
 */
function loadTodos() {
    try {
        const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (!stored) return [];
        
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) return [];
        
        // Validate each todo and filter invalid ones
        return parsed.filter(isValidTodo).slice(0, CONFIG.MAX_TODOS);
    } catch (error) {
        console.error('Error loading todos:', error);
        return [];
    }
}

/**
 * Save todos to localStorage
 * @param {Array} todosToSave - Array of todos to save
 */
function saveTodos(todosToSave) {
    try {
        const validTodos = todosToSave.filter(isValidTodo);
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(validTodos));
    } catch (error) {
        console.error('Error saving todos:', error);
        alert('Erreur lors de la sauvegarde. Vérifiez l\'espace de stockage disponible.');
    }
}

// ===== Gestion des tâches =====

/**
 * Generate unique ID for todo
 * @returns {string} Unique ID
 */
function generateId() {
    return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Add new todo
 * @param {string} text - Todo text
 */
function addTodo(text) {
    const sanitizedText = sanitizeInput(text);
    
    if (!sanitizedText) {
        alert('Veuillez entrer une tâche valide.');
        return;
    }
    
    if (todos.length >= CONFIG.MAX_TODOS) {
        alert(`Limite de ${CONFIG.MAX_TODOS} tâches atteinte.`);
        return;
    }
    
    const newTodo = {
        id: generateId(),
        text: sanitizedText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.unshift(newTodo);
    saveTodos(todos);
    renderTodos();
    elements.todoInput.value = '';
    elements.todoInput.focus();
}

/**
 * Toggle todo completion status
 * @param {string} id - Todo ID
 */
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
        renderTodos();
    }
}

/**
 * Delete todo
 * @param {string} id - Todo ID
 */
function deleteTodo(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        todos = todos.filter(t => t.id !== id);
        saveTodos(todos);
        renderTodos();
    }
}

/**
 * Edit todo text
 * @param {string} id - Todo ID
 */
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const newText = prompt('Modifier la tâche:', todo.text);
    if (newText === null) return; // User cancelled

    const sanitizedText = sanitizeInput(newText);
    if (!sanitizedText) {
        alert('Le texte de la tâche ne peut pas être vide.');
        return;
    }

    todo.text = sanitizedText;
    saveTodos(todos);
    renderTodos();
}

/**
 * Clear all completed todos
 */
function clearCompleted() {
    const completedCount = todos.filter(t => t.completed).length;

    if (completedCount === 0) {
        alert('Aucune tâche complétée à supprimer.');
        return;
    }

    if (confirm(`Supprimer ${completedCount} tâche(s) complétée(s) ?`)) {
        todos = todos.filter(t => !t.completed);
        saveTodos(todos);
        renderTodos();
    }
}

// ===== Filtrage =====

/**
 * Get filtered todos based on current filter
 * @returns {Array} Filtered todos
 */
function getFilteredTodos() {
    switch (currentFilter) {
        case CONFIG.FILTERS.ACTIVE:
            return todos.filter(t => !t.completed);
        case CONFIG.FILTERS.COMPLETED:
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

/**
 * Set current filter
 * @param {string} filter - Filter type
 */
function setFilter(filter) {
    currentFilter = filter;

    // Update active button
    elements.filterButtons.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderTodos();
}

// ===== Rendu de l'interface =====

/**
 * Create todo item element
 * @param {Object} todo - Todo object
 * @returns {HTMLElement} Todo list item
 */
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', todo.id);

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `Marquer "${todo.text}" comme ${todo.completed ? 'non complétée' : 'complétée'}`);
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    // Text
    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    // Actions container
    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'btn-icon btn-edit';
    editBtn.textContent = '✏️';
    editBtn.setAttribute('aria-label', `Modifier "${todo.text}"`);
    editBtn.addEventListener('click', () => editTodo(todo.id));

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon btn-delete';
    deleteBtn.textContent = '🗑️';
    deleteBtn.setAttribute('aria-label', `Supprimer "${todo.text}"`);
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(actions);

    return li;
}

/**
 * Update active count display
 */
function updateActiveCount() {
    const activeCount = todos.filter(t => !t.completed).length;
    elements.activeCount.textContent = activeCount;
}

/**
 * Render all todos
 */
function renderTodos() {
    const filteredTodos = getFilteredTodos();

    // Clear list
    elements.todoList.innerHTML = '';

    // Show/hide empty state
    if (filteredTodos.length === 0) {
        elements.emptyState.classList.remove('hidden');
        elements.todoList.classList.add('hidden');
    } else {
        elements.emptyState.classList.add('hidden');
        elements.todoList.classList.remove('hidden');

        // Render each todo
        filteredTodos.forEach(todo => {
            const todoElement = createTodoElement(todo);
            elements.todoList.appendChild(todoElement);
        });
    }

    updateActiveCount();
}

// ===== Event Listeners =====

/**
 * Initialize event listeners
 */
function initEventListeners() {
    // Form submission
    elements.todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = elements.todoInput.value.trim();
        if (text) {
            addTodo(text);
        }
    });

    // Filter buttons
    elements.filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setFilter(btn.dataset.filter);
        });
    });

    // Clear completed button
    elements.clearCompleted.addEventListener('click', clearCompleted);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus input
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            elements.todoInput.focus();
        }
    });
}

// ===== Initialization =====

/**
 * Initialize the application
 */
function init() {
    console.log('🚀 TODO App initialized');
    console.log('🔒 Security features enabled: XSS protection, input validation');

    // Load todos from storage
    todos = loadTodos();

    // Initialize event listeners
    initEventListeners();

    // Initial render
    renderTodos();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

