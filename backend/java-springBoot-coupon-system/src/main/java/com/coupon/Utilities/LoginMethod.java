package com.coupon.Utilities;
import com.coupon.Repositories.CompanyRepository;
import com.coupon.Repositories.CustomerRepository;
import com.coupon.Services.*;
import com.coupon.entity.ClientType;
import com.coupon.entity.Company;
import com.coupon.entity.Customer;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class LoginMethod {

    @Autowired
    private ApplicationContext ctx;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CompanyRepository companyRepository;

    public CouponClient login(String userName, String password, ClientType clientType){

        try {
            switch (clientType) {

                case ADMIN:
                        if (userName.equals("admin@admin.com") && password.equals("admin")) {
                        AdminService adminServiceBean = ctx.getBean(AdminServiceImpl.class);
                        System.out.println("adminServiceBean syso ..." + adminServiceBean);
                        return (CouponClient) adminServiceBean;
                    } else {
                            System.out.println("login failed");
                            return null;
                    }
                case COMPANY:
                    Company company = companyRepository.findByCompNameAndPassword(userName, password);
                    if (company != null) {
                        CompanyService companyServiceBean = ctx.getBean(CompanyServiceImpl.class);
                        companyServiceBean.setCompany(company);
                        System.out.println(company);
                        System.out.println("Company " + company.getCompName() + " logged in to system");
                        return (CouponClient) companyServiceBean;
                    } else {
                        System.out.println("login failed");
                        return null;
                    }
                case CUSTOMER:
                    Customer customer = customerRepository.findByCustomerNameAndAndPassword(userName, password);
                    if (customer != null) {
                        CustomerService customerServiceBean = ctx.getBean(CustomerServiceImpl.class);
                        customerServiceBean.setCustomer(customer);
                        System.out.println("Customer " + customer.getCustomerName() + " logged in to system");
                        return (CouponClient) customerServiceBean;
                    } else {
                        System.out.println("login failed ");
                        return null;
                    }
			default:
				break;
            }
        } catch (Exception e){
            System.out.println(e.getCause());
            System.out.println(e.getStackTrace());
            System.out.println(e.toString());
            System.out.println(e.getMessage());
            System.out.println(e.getLocalizedMessage());
        }
        System.out.println("null return after inputs ...");
        return null;
    }



}
