import { Api } from '../src/utils/Api';

test('Check get method', async () => {
  const api = new Api();
  const res = await api.get('test', {
    body: {
      name: 'Maliken',
      age: 22,
    },
  });

  expect(res.responseText).toBe('ok');
});

test('Check post method', async () => {
  const api = new Api();
  const res = await api.post('test', {
    body: {
      name: 'Maliken',
      age: 22,
    },
  });

  expect(res.responseText).toBe('ok');
});

test('Check put method', async () => {
  const api = new Api();
  const res = await api.put('test/10', {
    body: {
      name: 'New name',
    },
  });

  expect(res.responseText).toBe('ok');
});

test('Check delete method', async () => {
  const api = new Api();
  const res = await api.delete('test/10');

  expect(res.responseText).toBe('ok');
});

test('Throws with fail', async () => {
  const api = new Api();
  expect(async () => {
    await api.get('sdfiowe.sfewfea');
  });
});
