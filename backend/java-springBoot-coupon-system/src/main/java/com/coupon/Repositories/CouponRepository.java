package com.coupon.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coupon.entity.Coupon;

import java.util.List;

@Repository
public interface CouponRepository extends JpaRepository<Coupon , Long> {

    public Coupon findById(long couponId);

    public List<Coupon> findAllByCompanyId(long companyId);

    public List<Coupon> deleteByCompanyId(long companyId);


}
