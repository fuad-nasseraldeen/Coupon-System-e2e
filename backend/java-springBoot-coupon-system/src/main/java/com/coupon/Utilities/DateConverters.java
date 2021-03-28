package com.coupon.Utilities;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateConverters {

    public static Date getCurrentDate() {
        LocalDate localDate = LocalDate.now();
        Date date = java.sql.Date.valueOf(localDate);
        return date;
    }

    public static Date getExpiredDate() {

        LocalDate localDate = LocalDate.now();
        localDate = localDate.plusMonths(1);
        Date date = java.sql.Date.valueOf(localDate);

        return date;
    }

    public static Date getExpiredDateToTestExpiredCoupon() {
        LocalDate localDate = LocalDate.now();
        localDate = localDate.minusDays(2);
        Date date = java.sql.Date.valueOf(localDate);

        return date;
    }

    public static LocalDate convertDateToLocalDate(Date dateToConvert) {
        return Instant.ofEpochMilli(dateToConvert.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

}
