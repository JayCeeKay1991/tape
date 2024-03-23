// Time Format helper
export function formatTime (seconds: number) {
  return (
    Math.floor(seconds / 60) +
    ':' +
    ('0' + Math.floor(seconds % 60)).slice(-2)
  );
};



