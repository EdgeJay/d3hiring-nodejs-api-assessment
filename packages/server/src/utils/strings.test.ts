import test from 'ava';
import { extractEmailMentions, removeDuplicates } from './strings';

test('extractEmailMentions should return array of email address mentions', t => {
  const text = 'Hello students @student.a@example.com @john_tan@gmail.com @janedoe@email.com!';
  const array = extractEmailMentions(text);
  t.true(array.includes('student.a@example.com'));
  t.true(array.includes('john_tan@gmail.com'));
  t.true(array.includes('janedoe@email.com'));
});

test('extractEmailMentions should return array of email address mentions with @ preserved', t => {
  const text = 'Hello students @student.a@example.com @john_tan@gmail.com @janedoe@email.com!';
  const array = extractEmailMentions(text, false);
  t.true(array.includes('@student.a@example.com'));
  t.true(array.includes('@john_tan@gmail.com'));
  t.true(array.includes('@janedoe@email.com'));
});

test('extractEmailMentions should return empty array for text without mentions', t => {
  const text = 'Hello there!';
  const array = extractEmailMentions(text, false);
  t.true(Array.isArray(array));
  t.is(array.length, 0);
});

test('extractEmailMentions should return empty array for undefined inputs', t => {
  const array = extractEmailMentions(undefined, false);
  t.true(Array.isArray(array));
  t.is(array.length, 0);
});

test('extractEmailMentions should return array with no duplicates', t => {
  const text =
    'Hello students @student.a@example.com @student.a@example.com @john_tan@gmail.com @janedoe@email.com @janedoe@email.com!';
  const array = extractEmailMentions(text, false);
  t.is(array.length, 3);
  t.true(array.includes('@student.a@example.com'));
  t.true(array.includes('@john_tan@gmail.com'));
  t.true(array.includes('@janedoe@email.com'));
});

test('removeDuplicates should remove duplicate elements in array of strings', t => {
  const list = ['foo', 'foo', 'bar', 'baz'];
  const filteredList = removeDuplicates(list);
  t.is(filteredList.length, 3);
  t.true(filteredList.includes('foo'));
  t.true(filteredList.includes('bar'));
  t.true(filteredList.includes('baz'));
});
