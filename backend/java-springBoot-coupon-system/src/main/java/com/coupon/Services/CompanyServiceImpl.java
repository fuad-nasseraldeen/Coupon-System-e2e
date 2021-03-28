package com.coupon.Services;

import com.coupon.Repositories.CompanyRepository;
import com.coupon.Repositories.CouponRepository;
import com.coupon.Repositories.CustomerRepository;
import com.coupon.entity.ClientType;
import com.coupon.entity.Company;
import com.coupon.entity.Coupon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService, CouponClient{

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private CustomerRepository customerRepository;

    private ClientType clientType = ClientType.COMPANY;

    private Company company;

    @Override
    @Transactional
    public void addCoupon(Coupon coupon) throws Exception {
//       couponRepository.save(coupon);
         List<Coupon> companyCoupons = getAllCompanyCoupons();
         companyCoupons.add(coupon);
         this.company.setCoupons(companyCoupons);
         companyRepository.save(this.company);

    }

    @Override
    @Transactional
    public void removeCoupon(Coupon coupon) throws Exception {
        List<Coupon> companyCoupons = getAllCompanyCoupons();
        companyCoupons.remove(coupon);
        this.company.setCoupons(companyCoupons);
        companyRepository.save(this.company);
        couponRepository.delete(coupon);
    }

    @Override
    @Transactional
    public void updateCoupon(Coupon coupon) throws Exception {
      couponRepository.save(coupon);
    }

    @Override
    @Transactional
    public Company getCompany(long companyId) throws Exception {
       Company company = companyRepository.findByCompanyId(companyId);
       return  company;
    }

    @Override
    @Transactional
    public Coupon getCoupon(long couponId) throws Exception {
        Coupon requestedCoupon = couponRepository.findById(couponId);
        List<Coupon> companyCoupons = getAllCompanyCoupons();
        for(Iterator<Coupon> iterator = companyCoupons.iterator(); iterator.hasNext(); ) {
            Coupon companyCoupon = iterator.next();
            if (companyCoupon.getId() == requestedCoupon.getId()){
                return requestedCoupon;
            }
        }
        return null;
    }

    @Override
    @Transactional
    public List<Coupon> getAllCompanyCoupons() throws Exception {
        List<Coupon> coupons = couponRepository.findAllByCompanyId(getCompany().getCompanyId());
        return coupons;
    }

    @Override
    @Transactional
    public void setCompany(Company company) {
            this.company = company;
        }

    @Override
    @Transactional
    public Company getCompany() {
        return this.company;
    }

    @Override
    @Transactional
    public CouponClient login(String userName, String password, ClientType clientType) {
        return null;
    }

}
