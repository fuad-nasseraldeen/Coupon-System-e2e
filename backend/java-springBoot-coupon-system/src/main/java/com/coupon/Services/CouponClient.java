package com.coupon.Services;

import org.springframework.stereotype.Component;

import com.coupon.entity.ClientType;

    public interface CouponClient {

        public CouponClient login(String userName, String password, ClientType clientType);

    }
