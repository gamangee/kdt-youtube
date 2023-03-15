import React from "react";
import koLocale from "timeago.js/lib/lang/ko";
import { format, register } from "timeago.js";

register("ko", koLocale);

// timeAgo 사용
export function formatAgo(date, lang = "ko") {
  return format(date, lang);
}
