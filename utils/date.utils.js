import { addDays, format } from "date-fns";

export function getEstimate(numberEstimate) {
  const today = new Date();
  const _estimate = (numberEstimate || "").includes("-")
    ? Number(numberEstimate.split("-")[1])
    : Number(numberEstimate) || 0;
  const futureDateStart = addDays(today, _estimate);

  const futureDateEnd = addDays(today, _estimate + 2);

  return `${format(futureDateStart, "d")} - ${format(futureDateEnd, "d MMM")}`;
}

export function getSecondsFromDate(stringDate) {
  const targetTime = new Date(stringDate);

  // Mengambil waktu saat ini
  const currentTime = new Date();

  // Menghitung selisih waktu dalam milidetik
  const differenceInMillis = targetTime - currentTime;

  // Mengonversi selisih waktu dari milidetik ke detik
  return Math.floor(differenceInMillis / 1000);
}
