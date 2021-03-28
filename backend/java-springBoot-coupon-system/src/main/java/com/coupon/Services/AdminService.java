package com.coupon.Services;

import org.springframework.http.ResponseEntity;

import com.coupon.entity.Company;
import com.coupon.entity.Customer;

import java.util.List;

public interface AdminService {

    public void addCompany (Company company) throws Exception;

    public void removeCompany (Company company) throws Exception;

    public void updateCompany (Company company) throws Exception;

    public Company getCompany(long companyId) throws Exception;

    public List<Company> getAllCompanies() throws Exception;

    public void addCustomer (Customer customer) throws  Exception;

    public void removeCustomer (Customer customer) throws Exception;

    public void updateCustomer (Customer customer) throws Exception;

    public Customer getCustomer(long customerId) throws Exception;

    public List<Customer> getAllCustomers() throws Exception;


}
