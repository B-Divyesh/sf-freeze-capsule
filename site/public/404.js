for (const key of Object.keys(sessionStorage)) {
  if (key.startsWith('demo:')) sessionStorage.removeItem(key);
}
