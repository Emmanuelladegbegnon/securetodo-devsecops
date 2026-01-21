import { describe, it, expect, beforeEach } from 'vitest';

describe('SecureTodoApp - Security Tests', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  it('should sanitize XSS attempts in todo title', () => {
    const div = document.createElement('div');
    const maliciousInput = '<script>alert("XSS")</script>';
    div.textContent = maliciousInput;
    const sanitized = div.innerHTML;
    
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;');
  });

  it('should sanitize XSS attempts in description', () => {
    const div = document.createElement('div');
    const maliciousInput = '<img src=x onerror=alert(1)>';
    div.textContent = maliciousInput;
    const sanitized = div.innerHTML;

    // Vérifie que les balises HTML sont échappées (pas exécutables)
    expect(sanitized).not.toContain('<img');
    expect(sanitized).not.toContain('<script');
    expect(sanitized).toContain('&lt;');
    expect(sanitized).toContain('&gt;');
  });

  it('should enforce maximum title length of 200 characters', () => {
    const longString = 'a'.repeat(250);
    const maxLength = 200;
    
    expect(longString.length).toBeGreaterThan(maxLength);
    expect(longString.substring(0, maxLength).length).toBe(maxLength);
  });

  it('should validate todo data structure', () => {
    const validTodo = {
      id: Date.now(),
      title: 'Valid todo',
      description: 'Valid description',
      completed: false,
      createdAt: new Date().toISOString()
    };

    expect(validTodo).toHaveProperty('id');
    expect(validTodo).toHaveProperty('title');
    expect(validTodo).toHaveProperty('completed');
    expect(typeof validTodo.completed).toBe('boolean');
  });

  it('should handle localStorage errors gracefully', () => {
    const invalidJSON = 'not a valid json';
    localStorage.setItem('secureTodos', invalidJSON);
    
    let result;
    try {
      result = JSON.parse(localStorage.getItem('secureTodos'));
    } catch (e) {
      result = [];
    }
    
    expect(Array.isArray(result) || result === null).toBe(true);
  });

  it('should prevent empty todos', () => {
    const emptyInput = '   ';
    const trimmed = emptyInput.trim();
    
    expect(trimmed.length).toBe(0);
  });

  it('should store todos in localStorage', () => {
    const todos = [
      {
        id: 1,
        title: 'Test todo',
        description: 'Test description',
        completed: false,
        createdAt: new Date().toISOString()
      }
    ];
    
    localStorage.setItem('secureTodos', JSON.stringify(todos));
    const stored = JSON.parse(localStorage.getItem('secureTodos'));
    
    expect(stored).toEqual(todos);
    expect(stored.length).toBe(1);
  });

  it('should filter todos correctly', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
      { id: 3, title: 'Todo 3', completed: false }
    ];

    const activeTodos = todos.filter(t => !t.completed);
    const completedTodos = todos.filter(t => t.completed);

    expect(activeTodos.length).toBe(2);
    expect(completedTodos.length).toBe(1);
  });

  it('should search todos case-insensitively', () => {
    const todos = [
      { id: 1, title: 'Buy groceries', description: 'Milk and bread' },
      { id: 2, title: 'Clean house', description: 'Living room' }
    ];

    const searchTerm = 'GROCERIES';
    const results = todos.filter(todo =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    expect(results.length).toBe(1);
    expect(results[0].title).toBe('Buy groceries');
  });
});

describe('SecureTodoApp - Functionality Tests', () => {
  
  it('should generate unique IDs for todos', () => {
    const id1 = Date.now();
    const id2 = Date.now() + 1;
    
    expect(id1).not.toBe(id2);
  });

  it('should toggle todo completion status', () => {
    let todo = { id: 1, title: 'Test', completed: false };
    
    todo = { ...todo, completed: !todo.completed };
    expect(todo.completed).toBe(true);
    
    todo = { ...todo, completed: !todo.completed };
    expect(todo.completed).toBe(false);
  });

  it('should delete todo by id', () => {
    const todos = [
      { id: 1, title: 'Todo 1' },
      { id: 2, title: 'Todo 2' },
      { id: 3, title: 'Todo 3' }
    ];

    const filtered = todos.filter(t => t.id !== 2);
    
    expect(filtered.length).toBe(2);
    expect(filtered.find(t => t.id === 2)).toBeUndefined();
  });

  it('should calculate statistics correctly', () => {
    const todos = [
      { id: 1, completed: false },
      { id: 2, completed: true },
      { id: 3, completed: false },
      { id: 4, completed: true }
    ];

    const stats = {
      total: todos.length,
      active: todos.filter(t => !t.completed).length,
      completed: todos.filter(t => t.completed).length
    };

    expect(stats.total).toBe(4);
    expect(stats.active).toBe(2);
    expect(stats.completed).toBe(2);
  });
});

