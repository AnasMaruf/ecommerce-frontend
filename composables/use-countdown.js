// useCountdown.js
export function useCountdown() {
  let intervalId = null;
  const seconds = ref(0);

  const padNumber = (num) => {
    return num.toString().padStart(2, "0");
  };

  const displayValue = computed(() => {
    const totalSeconds = seconds.value;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    // Jika hanya detik, 00
    if (totalSeconds < 60) {
      return `${padNumber(remainingSeconds)}`;
    }

    // Jika ada jam, 00:00:00
    if (hours > 0) {
      return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(
        remainingSeconds
      )}`;
    }

    // Jika ada menit, 00:00
    return `${padNumber(minutes)}:${padNumber(remainingSeconds)}`;
  });

  const isRunning = computed(() => seconds.value > 0);

  const startCountdown = (totalSeconds, callback) => {
    // Clear interval yang ada
    if (intervalId) {
      clearInterval(intervalId);
    }

    seconds.value = totalSeconds;

    intervalId = setInterval(() => {
      if (seconds.value > 0) {
        seconds.value--;
      } else {
        stopCountdown();
        if (callback) {
          callback();
        }
      }
    }, 1000);
  };

  const stopCountdown = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const resetCountdown = () => {
    stopCountdown();
    seconds.value = 0;
  };

  // Cleanup
  onUnmounted(() => {
    stopCountdown();
  });

  return {
    displayValue,
    isRunning,
    seconds,
    startCountdown,
    stopCountdown,
    resetCountdown,
  };
}
