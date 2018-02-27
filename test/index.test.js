'use strict';
const dockerComposeToApi = require('../lib/index');
const tap = require('tap');
const fs = require('fs');
const path = require('path');

tap.test('dockerComposeToApi should be a function', (t) => {
  t.equal(typeof dockerComposeToApi, 'function');
  t.end();
});

tap.test('dockerComposeToApi handles container_name', (t) => {
  var yaml = fs.readFileSync(path.join(__dirname, 'fixtures' , 'service.full.yml'), { encoding: 'utf8'});
  var engineSpec = dockerComposeToApi(yaml);
  t.deepEqual(engineSpec.Name, 'cool-auth');
  t.end();
});

tap.test('dockerComposeToApi handles label as array', (t) => {
  var yaml = fs.readFileSync(path.join(__dirname, 'fixtures' , 'service.label.array.yml'), { encoding: 'utf8'});
  var engineSpec = dockerComposeToApi(yaml);
  t.deepEqual(engineSpec.TaskTemplate.ContainerSpec.Labels, { 'test': 'one', 'fire': 'everything' });
  t.end();
});

tap.test('dockerComposeToApi handles label as dictionary', (t) => {
  var yaml = fs.readFileSync(path.join(__dirname, 'fixtures' , 'service.label.dictionary.yml'), { encoding: 'utf8'});
  var engineSpec = dockerComposeToApi(yaml);
  t.deepEqual(engineSpec.TaskTemplate.ContainerSpec.Labels, { 'test': 'one', 'fire': 'everything' });
  t.end();
});

tap.test('dockerComposeToApi handles command as array', (t) => {
  var yaml = fs.readFileSync(path.join(__dirname, 'fixtures' , 'service.command.array.yml'), { encoding: 'utf8'});
  var engineSpec = dockerComposeToApi(yaml);
  t.deepEqual(engineSpec.TaskTemplate.ContainerSpec.Command, ['bundle', 'exec', 'npm', 'test']);
  t.end();
});

tap.test('dockerComposeToApi handles command as string', (t) => {
  var yaml = fs.readFileSync(path.join(__dirname, 'fixtures' , 'service.command.string.yml'), { encoding: 'utf8'});
  var engineSpec = dockerComposeToApi(yaml);
  t.deepEqual(engineSpec.TaskTemplate.ContainerSpec.Command, ['bundle exec npm test']);
  t.end();
});

tap.test('dockerComposeToApi handles environment variables', (t) => {
  var yaml = fs.readFileSync(path.join(__dirname, 'fixtures' , 'service.environment.yml'), { encoding: 'utf8'});
  var engineSpec = dockerComposeToApi(yaml);
  t.deepEqual(engineSpec.TaskTemplate.ContainerSpec.Env, ['APP_NAME=micro-auth','REDIRECT_URL=/info']);
  t.end();
});

tap.test('dockerComposeToApi handles configs', (t) => {
  var yaml = fs.readFileSync(path.join(__dirname, 'fixtures' , 'service.configs.yml'), { encoding: 'utf8'});
  var engineSpec = dockerComposeToApi(yaml);
  t.deepEqual(engineSpec.TaskTemplate.ContainerSpec.Configs, [{ ConfigID: 'main_config', ConfigName: 'main_config', File: "./main_config.txt"}]);
  t.end();
});

tap.test('dockerComposeToApi handles secrets', (t) => {
  var yaml = fs.readFileSync(path.join(__dirname, 'fixtures' , 'service.secrets.yml'), { encoding: 'utf8'});
  var engineSpec = dockerComposeToApi(yaml);
  t.deepEqual(engineSpec.TaskTemplate.ContainerSpec.Secrets, [{ SecretID: 'main_secret', SecretName: 'main_secret', File: "./main_secret.txt"}]);
  t.end();
});
