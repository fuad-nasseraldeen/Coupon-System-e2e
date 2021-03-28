package com.coupon.Services;

import com.coupon.Repositories.CompanyRepository;
import com.coupon.Repositories.CouponRepository;
import com.coupon.Repositories.CustomerRepository;
import com.coupon.entity.ClientType;
import com.coupon.entity.Coupon;
import com.coupon.entity.CouponType;
import com.coupon.entity.Customer;

import org.hibernate.FlushMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

@Service
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class CustomerServiceImpl implements CustomerService , CouponClient {



    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CouponRepository couponRepository;

    private Customer customer;

    private ClientType clientType = ClientType.CUSTOMER;

    @Override
    @Transactional
    public Customer getCustomer(long customerId) throws Exception {
       Customer customer = customerRepository.findCustomerById(customerId);
       return customer;
    }

    @Override
    @Transactional
    public void purchaseCoupon(Coupon coupon) throws Exception {
        Coupon couponFromDB = couponRepository.findById(coupon.getId());
        if(couponFromDB == null){
            throw new Exception("Coupon Not Available");
        }
        if (couponFromDB.getAmount() <= 0){

            throw new Exception("Coupon Not Available");
        }
        if (getAllPurchaseCoupons().contains(couponFromDB)) {
            throw new Exception("Already bought");
        }

        List<Coupon> customerCoupons = getAllPurchaseCoupons();
        customerCoupons.add(coupon);
        this.customer.setCoupons(customerCoupons);
        customerRepository.save(this.customer);
        coupon.setAmount((coupon.getAmount() -1));
        couponRepository.save(coupon);

    }

    @Override
    @Transactional
    public List<Coupon> getAllPurchaseCoupons() throws Exception {
        List<Coupon> coupons = customerRepository.findById(this.customer.getId()).get().getCoupons();
        return coupons;
    }

    @Override
    @Transactional
    public List<Coupon> getAllAvailableCoupons() throws Exception {
        List<Coupon> allCoupons = couponRepository.findAll();
        List<Coupon> customerCoupons = getAllPurchaseCoupons();
        allCoupons.removeAll(customerCoupons);

        List<Coupon> notMyCoupons = allCoupons;
        for(Iterator<Coupon> iterator = notMyCoupons.iterator(); iterator.hasNext() ;){
            Coupon coupon = iterator.next();
            // remove from list if out of stock
            if (coupon.getAmount() < 1){
                iterator.remove();
            }
        }
        return notMyCoupons;
    }

    @Override
    @Transactional
    public List<Coupon> getAllAvailableCouponsByType(CouponType couponType) throws Exception {
        List<Coupon> allAvailableCoupons = getAllAvailableCoupons();
        for(Iterator<Coupon> iterator = allAvailableCoupons.iterator() ; iterator.hasNext() ;){
            Coupon coupon = iterator.next();
            if (coupon.getType() != couponType){
                iterator.remove();
            }
        }
        return allAvailableCoupons;
    }

    @Override
    @Transactional
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    @Transactional
    public CouponClient login(String userName, String password, ClientType clientType) {
        return null;
    }

    @Override
    @Transactional
    public Coupon getAvailableCouponById(long couponId) throws Exception {
        Coupon requestedCoupon = couponRepository.findById(couponId);
        Collection<Coupon> coupons = getAllAvailableCoupons();
        for(Iterator<Coupon> iterator = coupons.iterator() ; iterator.hasNext() ;){
            Coupon coupon = iterator.next();
            if (coupon.getId() == requestedCoupon.getId()){
                return requestedCoupon;
            }
        }
        System.out.println("Can't get coupon - not available for this user.");
        return null;
    }


}
