const test = require('tape');

test('Simple tests', require('./_simple_tests'));
test('Valid output tests', require('./_valid_output'));
test('Invalid output tests', require('./_invalid_output'));
test('Custom messages', require('./_custom_messages'));
test('Chaining tests', require('./_chaining_test'));
test('Asynchronus tests', require('./_async_test'));
