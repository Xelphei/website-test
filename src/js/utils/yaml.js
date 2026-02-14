import yaml from 'js-yaml';

export async function loadYaml(path) {
  const response = await fetch(path);
  const text = await response.text();
  return yaml.load(text);
}
