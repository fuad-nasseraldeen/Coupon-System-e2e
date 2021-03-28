package com.coupon.Utilities;

import com.coupon.Repositories.CompanyRepository;
import com.coupon.Repositories.CustomerRepository;
import com.coupon.Services.AdminService;
import com.coupon.entity.Company;
import com.coupon.entity.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class Validations {

    private static CompanyRepository companyRepository;

    private static CustomerRepository customerRepository;

    @Autowired
    public Validations(CompanyRepository companyRepository, CustomerRepository customerRepository){
        Validations.companyRepository = companyRepository;
        Validations.customerRepository = customerRepository;
    }

    public static boolean checkIfCustomerExist(Customer customer) throws Exception {
        boolean customerExist = false;

        List<Customer> allCustomers = new ArrayList<Customer>();
        allCustomers = customerRepository.findAll();
        Iterator<Customer> itr = allCustomers.iterator();

        while (itr.hasNext()) {
            Customer tempCustomer = new Customer();
            tempCustomer = itr.next();
            if (tempCustomer.getCustomerName().equals(customer.getCustomerName())) {
                customerExist = true;

                return customerExist;
            }
        }
        return customerExist;
    }

    public static boolean checkIfCompanyExist(Company company) throws Exception {
        boolean companyExist = false;
        List<Company> allCompanies = new ArrayList<>();
        allCompanies = companyRepository.findAll();
        Iterator<Company> itr = allCompanies.iterator();

        while (itr.hasNext()) {
            Company tempCompany = new Company();
            tempCompany = itr.next();
            if (tempCompany.getCompName().equals(company.getCompName())) {
                companyExist = true;
                return companyExist;
            }
        }
        return companyExist;
    }


}
