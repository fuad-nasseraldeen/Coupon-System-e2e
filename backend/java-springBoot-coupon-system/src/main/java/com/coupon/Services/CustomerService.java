package com.coupon.Services;

import java.util.List;

import com.coupon.entity.Coupon;
import com.coupon.entity.CouponType;
import com.coupon.entity.Customer;

public interface CustomerService {

    public Customer getCustomer(long customerId) throws Exception;

    public void purchaseCoupon(Coupon coupon) throws  Exception;

    public List<Coupon> getAllPurchaseCoupons() throws Exception;

    public List<Coupon> getAllAvailableCoupons() throws Exception;

    public void setCustomer(Customer customer);

    public Coupon getAvailableCouponById(long couponId) throws Exception;

    public List<Coupon> getAllAvailableCouponsByType(CouponType couponType) throws Exception;

}
