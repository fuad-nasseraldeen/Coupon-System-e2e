package com.coupon.Services;

import org.springframework.http.ResponseEntity;

import com.coupon.entity.Coupon;
import com.coupon.entity.CouponType;
import com.coupon.entity.Customer;

import java.util.List;

public interface PublicService {
    public void register(Customer customer) throws  Exception;

    public List<Coupon> getAllCoupons() throws Exception;

}
