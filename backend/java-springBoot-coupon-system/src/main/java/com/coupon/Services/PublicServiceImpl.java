package com.coupon.Services;

import com.coupon.Repositories.CouponRepository;
import com.coupon.Repositories.CustomerRepository;
import com.coupon.entity.Coupon;
import com.coupon.entity.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class PublicServiceImpl implements PublicService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CouponRepository couponRepository;

    @Override
    @Transactional
    public void register(Customer customer) throws Exception {
        customerRepository.save(customer);
    }

    @Override
    @Transactional
    public List<Coupon> getAllCoupons() throws Exception {
        List<Coupon> coupons = couponRepository.findAll();
        return coupons;
    }

}
