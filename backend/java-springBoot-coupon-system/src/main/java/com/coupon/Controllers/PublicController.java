package com.coupon.Controllers;

import com.coupon.Services.PublicService;
import com.coupon.Utilities.Validations;
import com.coupon.entity.Coupon;
import com.coupon.entity.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.PostRemove;
import javax.servlet.http.HttpServletRequest;
import javax.xml.crypto.dsig.spec.ExcC14NParameterSpec;
import java.util.List;

@RestController
public class PublicController {

    @Autowired
    private PublicService publicService;


@PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Customer customer) throws Exception{
    if( customer != null ) {
        if (!Validations.checkIfCustomerExist(customer)){
                if( !customer.getCustomerName().contains(" ") && !customer.getPassword().contains(" ") &&
                !customer.getPassword().equals("") && !customer.getCustomerName().equals("")) {
            publicService.register(customer);
            return new ResponseEntity<>("Customer " + customer.getCustomerName() + " registered successfully. ", HttpStatus.OK);
         } else {
                    return new ResponseEntity<>("Bad request inserted, please try again.", HttpStatus.BAD_REQUEST);
                }
        } else {
            return new ResponseEntity<>("Customer already exist", HttpStatus.BAD_REQUEST);
        }
    } else {
        return new ResponseEntity<>("Null inserted, please try again.", HttpStatus.BAD_REQUEST);
    }
}

@GetMapping("/getAllCoupons")
    public ResponseEntity<?> getAllCoupons() throws Exception {
      List<Coupon> couponList = publicService.getAllCoupons();
      if(couponList != null ){
          return new ResponseEntity<>(couponList , HttpStatus.OK);
      } else {
          return new ResponseEntity<>("No coupons" , HttpStatus.NOT_FOUND);
      }
    }

    @PostMapping("/sendEmail")
    public ResponseEntity<?> sendEmail(@RequestBody String msg) throws Exception {
        //myEmailService.sendEmail(msg);
        return new ResponseEntity<>("Email sent successfully to Oriel" , HttpStatus.OK);
    }

}
