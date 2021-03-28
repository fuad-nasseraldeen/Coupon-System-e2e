package com.coupon.Controllers;

import com.coupon.Services.AdminService;
import com.coupon.Utilities.Validations;
import com.coupon.entity.Company;
import com.coupon.entity.Customer;
import com.google.gson.Gson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private HttpServletRequest request;

    private AdminService getService() throws  Exception {
        try {
            AdminService adminService = null;
            adminService = (AdminService) request.getSession(false).getAttribute("service");
            System.out.println("Print Test from the controller .....   " + adminService);
            return adminService;
        } catch (Exception ex){
            return null;
        }
    }

    @PostMapping("/createCompany")
    public ResponseEntity<?> createCompany(@RequestBody Company company) throws Exception{

        AdminService adminService = getService();
        if(adminService != null) {
            if (company != null ) {
                if (!Validations.checkIfCompanyExist(company)) {
                    adminService.addCompany(company);
                    return new ResponseEntity<>("Added company successfully", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Failed to create company - company name already exist",HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>("Failed to create company",HttpStatus.BAD_REQUEST);

            }
        } else{
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);

        }
    }


	@GetMapping("/getAllCompanies")
    public ResponseEntity<?> getAllCompanies() throws Exception{

    	    AdminService adminService = getService();
        System.out.println(adminService);
    	    if(adminService != null){
                List<Company> companies = adminService.getAllCompanies();
                return new ResponseEntity<>(companies, HttpStatus.OK);
    	    } else {
                return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
            }
    }

    @GetMapping("/getCompany/{companyId}")
    public ResponseEntity<?> getCompany(@PathVariable("companyId") long companyId) throws Exception {

        AdminService adminService = getService();
        if(adminService != null){
            Company company = null;
            company = adminService.getCompany(companyId);
            if(company != null ){
                return new ResponseEntity<>(company ,HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Wrong company id" ,HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);

        }
    }

    @DeleteMapping("/removeCompany/{companyId}")
    public ResponseEntity<?> removeCompany(@PathVariable("companyId") long companyId) throws Exception {

        AdminService adminService = getService();
        if(adminService != null){
            Company company = null;
            company = adminService.getCompany(companyId);
            if(company != null) {
                adminService.removeCompany(company);
            } else {
                return new ResponseEntity<>("Removed Company Failed" ,HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>("Removed Company Successfully" ,HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/updateCompany")
    public ResponseEntity<?> updateCompany(@RequestBody String companyJson) throws Exception{

       AdminService adminService = getService();
        if (adminService != null) {
            Gson gson = new Gson();

            Company companyFromJson = gson.fromJson(companyJson, Company.class);

            if (companyFromJson.getCompanyId() > 0) {

                if (Validations.checkIfCompanyExist(adminService.getCompany(companyFromJson.getCompanyId()))) {
                    Company company = adminService.getCompany(companyFromJson.getCompanyId());

                    if ( company != null ) {
                        if (companyFromJson.getEmail() != null && !companyFromJson.getEmail().isEmpty()) {
                            company.setEmail(companyFromJson.getEmail());
                            adminService.updateCompany(company);
                        } else {
                            return new ResponseEntity<>("Invalid new email, please try again" ,HttpStatus.BAD_REQUEST);
                        }
                        if (companyFromJson.getPassword() != null && !companyFromJson.getPassword().isEmpty()) {
                            company.setPassword(companyFromJson.getPassword());
                            adminService.updateCompany(company);
                        } else {
                            return new ResponseEntity<>("Invalid new password, please try again" ,HttpStatus.BAD_REQUEST);
                        }
                        return new ResponseEntity<>("Company  " + company.getCompName() + " Updated Successfully " ,HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>("There is no such company in DB" ,HttpStatus.BAD_REQUEST);
                    }
                } else {
                    return new ResponseEntity<>("There is no company with the id that inserted, please try again! " ,HttpStatus.BAD_REQUEST);
                }
            }
            return new ResponseEntity<>("Invalid - id that inserted <= 0 " ,HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>("Unauthorized!" , HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/createCustomer")
    public ResponseEntity<?> createCustomer(@RequestBody Customer customer) throws Exception{

        AdminService adminService = getService();
        if(adminService != null) {
            if (customer != null ) {
                adminService.addCustomer(customer);
                return new ResponseEntity<>("Added customer " + customer.getCustomerName() + " successfully",HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Added customer Failed",HttpStatus.BAD_REQUEST);
            }
        } else{
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getAllCustomers")
    public ResponseEntity<?> getAllCustomers() throws Exception {
        AdminService adminService = getService();
        if(adminService != null){
            List<Customer> customers = adminService.getAllCustomers();
            return new ResponseEntity<>(customers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }


    @GetMapping("/getCustomer/{customerId}")
    public ResponseEntity<?> getCustomer(@PathVariable("customerId") long customerId) throws Exception {

        AdminService adminService = getService();
        if(adminService != null){
            Customer customer = null;
            customer = adminService.getCustomer(customerId);
            if(customer != null ){
                return new ResponseEntity<>(customer ,HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Wrong Customer id" ,HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/removeCustomer/{customerId}")
    public ResponseEntity<?> removeCustomer(@PathVariable("customerId") long customerId) throws Exception {

        AdminService adminService = getService();
        if(adminService != null){
            Customer customer= null;
            customer = adminService.getCustomer(customerId);
            if(customer != null) {
                adminService.removeCustomer(customer);
            } else {
                return new ResponseEntity<>("Removed Customer Failed" ,HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>("Removed Customer Successfully" ,HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/updateCustomer")
    public ResponseEntity<?> updateCustomer (@RequestBody String customerJson) throws Exception{

        AdminService adminService = getService();
        if ( adminService != null) {
            Gson gson = new Gson();
            Customer jsonCustomer = gson.fromJson(customerJson, Customer.class);

            //Print TEST - that all data was parse correctly from the json sent from the Client
            System.out.println(jsonCustomer.getCustomerName() + " " + jsonCustomer.getPassword() + " " + jsonCustomer.getId());

            if (jsonCustomer.getId() >= 0) {
                if (Validations.checkIfCustomerExist(adminService.getCustomer(jsonCustomer.getId()))) {
                    Customer customer = adminService.getCustomer(jsonCustomer.getId());
                    if (customer != null) {
                        if (jsonCustomer.getCustomerName() != null && !jsonCustomer.getCustomerName().isEmpty()) {
                            customer.setCustomerName(jsonCustomer.getCustomerName());
                            adminService.updateCustomer(customer);
                        } else {
                            return new ResponseEntity<>(" Invalid new customer name inserted " ,HttpStatus.BAD_REQUEST);
                        }
                        if (jsonCustomer.getPassword() != null && !jsonCustomer.getPassword().isEmpty()) {
                            customer.setPassword(jsonCustomer.getPassword());
                            adminService.updateCustomer(customer);
                        } else {
                            return new ResponseEntity<>(" Invalid new password inserted " ,HttpStatus.BAD_REQUEST);
                        }
                    } else {
                        return new ResponseEntity<>(" Customer does not exist , Invalid customer details inserted " ,HttpStatus.BAD_REQUEST);
                    }
                    return new ResponseEntity<>("SUCCEED TO UPDATE CUSTOMER ID: " + customer.getId() ,HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("The id that inserted is not valid, please try again." ,HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>("The id that inserted is not valid, please try again. " ,HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }



}

