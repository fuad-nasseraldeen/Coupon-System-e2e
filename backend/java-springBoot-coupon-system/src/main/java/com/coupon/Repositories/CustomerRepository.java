package com.coupon.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coupon.entity.Company;
import com.coupon.entity.Coupon;
import com.coupon.entity.Customer;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository <Customer , Long> {

    public Customer findCustomerById (long customerId);

    public Customer findCustomerByCustomerName(String customerName);

    public Customer findByCustomerNameAndAndPassword(String name, String password);

    public boolean existsById(long id);

}

