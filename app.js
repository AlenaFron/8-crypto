/**
 * Шифратор пароля
 * Алгоритм: делит строку на две части и разворачивает каждую отдельно.
 * Пример: 'password' -> 'pass' + 'word' -> 'ssap' + 'drow' -> 'ssapdorw'
 */
function crypto(password) {
    // Валидация входных данных
    if (typeof password !== 'string' || password.length === 0) {
        return null;
    }

    const mid = Math.floor(password.length / 2);
    
    // Разрезаем на две части
    const firstPart = password.slice(0, mid);
    const secondPart = password.slice(mid);

    // Разворачиваем части через массивы и соединяем
    const encryptedFirst = firstPart.split('').reverse().join('');
    const encryptedSecond = secondPart.split('').reverse().join('');

    return encryptedFirst + encryptedSecond;
}

/**
 * Проверка пароля
 * Применяет алгоритм дешифрования (зеркальный) и сравнивает с оригиналом
 */
function check(encryptedPassword, originalPassword) {
    // Валидация входных данных
    if (!encryptedPassword || !originalPassword) {
        return false;
    }

    // Так как алгоритм "разворот половин" симметричен, 
    // повторное применение crypto() к зашифрованной строке вернет оригинал.
    const decrypted = crypto(encryptedPassword);

    return decrypted === originalPassword;
}

// --- РАСШИРЕННЫЕ ТЕСТОВЫЕ ПРИМЕРЫ ---

console.log('--- Базовая проверка по ТЗ ---');
const encrypted = crypto('password');
console.log('crypto("password"):', encrypted); // Ожидание: 'ssapdorw'
console.log('check("ssapdorw", "password"):', check(encrypted, 'password')); // true
console.log('check("ssapdorw", "wrong"):', check(encrypted, 'wrong'));       // false

console.log('\n--- Дополнительные тесты ---');
// Тест с нечетным количеством символов
const oddWord = 'scripts'; // 'scr' + 'ipts' -> 'rcs' + 'stpi'
console.log('crypto("scripts"):', crypto('scripts')); 
console.log('check корректен для нечетных:', check(crypto('scripts'), 'scripts')); // true

// Тест с короткими словами
console.log('crypto("ab"):', crypto('ab')); // 'a' + 'b' -> 'a' + 'b' -> 'ab'

// Тест на пустые данные
console.log('crypto(""):', crypto('')); // null
console.log('check(null, "123"):', check(null, '123')); // false