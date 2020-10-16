/* eslint-disable quotes */
import mock from 'xhr-mock';
import { Api } from './Api';

let api: Api;

beforeEach(() => {
  mock.setup();
  api = new Api();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  api.baseUrl = '';

});

afterEach(() => {
  mock.teardown();
});

test('Should set content type multipart/form-data', async () => {
  mock.post('test', (req, res) => {
    expect(req.header('Content-Type')).toContain('multipart/form-data');
    return res.status(200).body('ok');
  });

  await api.post('test', {
    contentType: 'multipart/form-data',
    body: {
      name: 'Maliken',
      age: 22,
    }
  })
})

test('Should convert body to query params', async (done) => {
  expect.assertions(2);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  api.baseUrl = '';

  mock.get('test?name=%22Maliken%22&age=22', (req, res) => {
    expect(req.header('Content-Type')).toEqual('application/json');
    expect(req.url().query).toEqual({name: "\"Maliken\"", age: "22"});
    return res.status(200).body('ok');
  });

  await api.get('test', {
    body: {
      name: 'Maliken',
      age: 22
    }
  });
  done();
});

test('Should have method PUT', async () => {
  mock.put('test', (req, res) => {
    expect(req.method()).toEqual('PUT');
    return res.status(200).body('ok');
  })

  await api.put('test');
})

test('Should have method POST', async () => {
  mock.post('test', (req, res) => {
    expect(req.method()).toEqual('POST');
    return res.status(200).body('ok');
  })

  await api.post('test');
})

test('Should have method GET', async () => {
  mock.get('test', (req, res) => {
    expect(req.method()).toEqual('GET');
    return res.status(200).body('ok');
  })

  await api.get('test');
})

test('Should have method DELETE', async () => {
  mock.delete('test', (req, res) => {
    expect(req.method()).toEqual('DELETE');
    return res.status(200).body('ok');
  })

  await api.delete('test');
})

test('Should send post data', async () => {
  mock.post('test', (req, res) => {
    expect(JSON.parse(req.body())).toEqual({name: 'Maliken', age: 22});
    return res.status(200).body('ok');
  });

  await api.post('test', {
    body: {
      name: 'Maliken',
      age: 22
    }
  })
});
