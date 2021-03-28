package com.coupon.Services;

import com.coupon.Repositories.CompanyRepository;
import com.coupon.Repositories.CouponRepository;
import com.coupon.Repositories.CustomerRepository;
import com.coupon.entity.ClientType;
import com.coupon.entity.Company;
import com.coupon.entity.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService, CouponClient{

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CouponRepository couponRepository;

    private ClientType clientType = ClientType.ADMIN;

    @Override
    @Transactional
    public void addCompany(Company company) throws Exception {
        companyRepository.save(company);
    }

    @Override
    @Transactional
    public void removeCompany(Company company) throws Exception {
        companyRepository.delete(company);
    }

    @Override
    @Transactional
    public void updateCompany(Company company) throws Exception {
        companyRepository.save(company);
    }

    @Override
    @Transactional
    public Company getCompany(long companyId) throws Exception {
        Company company = companyRepository.findByCompanyId(companyId);
        return company;
    }

    @Override
    @Transactional
    public List<Company> getAllCompanies() throws Exception {
       List<Company> companies = companyRepository.findAll();
       return companies;
    }

    @Override
    @Transactional
    public void addCustomer(Customer customer) throws Exception {
        customerRepository.save(customer);
    }

    @Override
    @Transactional
    public void removeCustomer(Customer customer) throws Exception {
        customerRepository.delete(customer);
    }

    @Override
    @Transactional
    public void updateCustomer(Customer customer) throws Exception {
        customerRepository.save(customer);
    }

    @Override
    @Transactional
    public Customer getCustomer(long customerId) throws Exception {
        Customer customer = customerRepository.findCustomerById(customerId);
        return customer;
    }

    @Override
    @Transactional
    public List<Customer> getAllCustomers() throws Exception {
        List<Customer> customers = customerRepository.findAll();
        return customers;
    }

    @Override
    @Transactional
    public CouponClient login(String userName, String password, ClientType clientType) {
        return null;
    }
}
