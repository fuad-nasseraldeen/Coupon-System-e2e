package com.coupon.Services;

import org.springframework.http.ResponseEntity;

import com.coupon.entity.Company;
import com.coupon.entity.Coupon;

import java.util.List;

public interface CompanyService {

    public void addCoupon(Coupon coupon) throws Exception;

    public void removeCoupon (Coupon coupon) throws Exception;

    public void updateCoupon(Coupon coupon) throws Exception;

    public Company getCompany(long companyId) throws Exception;

    public Coupon getCoupon(long couponId) throws Exception;

    public List<Coupon> getAllCompanyCoupons() throws  Exception;

    public void setCompany(Company company);

    public Company getCompany();

}
