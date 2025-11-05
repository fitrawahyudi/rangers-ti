import moment from "moment-timezone";

export default function TimezoneGreeting({ timezone, name }) {
  const greeting = getGreetingByTimezone(timezone);
  return (
    <p>
      {greeting}, <span className="fw-bold text-primary">{name}</span>
    </p>
  );
}

const getGreetingByTimezone = (timezone) => {
  const zone = timezone || moment.tz.guess() || "Asia/Jakarta";

  const now = moment.tz(zone);
  const hour = now.hour();

  if (hour >= 5 && hour < 12) {
    return "Selamat Pagi";
  } else if (hour >= 12 && hour < 15) {
    return "Selamat Siang";
  } else if (hour >= 15 && hour < 18) {
    return "Selamat Sore";
  } else {
    return "Selamat Malam";
  }
};
