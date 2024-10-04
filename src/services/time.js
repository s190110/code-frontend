export const getTimeDiff = (start, end, full) => {
  const startTime = start ? new Date(start) : new Date(),
    endTime = new Date(end);
  var diff = endTime - startTime;
  //   const days = diff / (1000 * 60 * 60 * 24),
  //     hours = (diff % days) / (1000 * 60 * 60),
  //     minutes = ((diff % days) % hours) / (1000 * 60),
  //     seconds = (((diff % days) % hours) % minutes) / 60;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  if (days > 10) return `Ends at ${endTime.toLocaleString()}`;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);

  const seconds = Math.floor(diff / 1000);

  if (full)
    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds left`;
  else {
    if (days) return `${days} days`;
    if (hours) return `${days} days`;
    if (minutes) return `${minutes} days`;
    if (seconds) return `${seconds} days`;
  }
};
