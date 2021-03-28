package com.coupon.Controllers;

import com.coupon.Services.CustomerService;
import com.coupon.entity.Coupon;
import com.coupon.entity.CouponType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private HttpServletRequest request;

    private CustomerService getService() throws  Exception {
        try {
            CustomerService customerService = null;
            customerService = (CustomerService) request.getSession(false).getAttribute("service");
            return customerService;
        } catch (Exception ex){
            System.out.println(ex.getMessage());
            return null;
        }
    }

    @PostMapping("/purchaseCoupon/{couponId}")
    public ResponseEntity<?> purchaseCoupon(@PathVariable("couponId")long couponId) throws Exception{
        CustomerService customerService = getService();
        if(customerService != null){
            Coupon coupon = customerService.getAvailableCouponById(couponId);
            if (coupon != null ){
                customerService.purchaseCoupon(coupon);
                return new ResponseEntity<>("Coupon bought successfully" , HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Coupon not available for this customer, coupon already bought" , HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getAllAvailableCoupons")
    public ResponseEntity<?> getAllAvailableCoupons() throws Exception{
        CustomerService customerService = getService();
        if(customerService != null){
            List<Coupon> couponList = customerService.getAllAvailableCoupons();
            if (couponList != null ){
                return new ResponseEntity<>(couponList , HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Couldn't get coupons" , HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getAllAvailableCoupons/{couponType}")
    public ResponseEntity<?> getAllAvailableCouponsByType(@PathVariable("couponType") String stringCouponType) throws Exception{
        CustomerService customerService = getService();
        if(customerService != null){
            CouponType enumType = CouponType.valueOf(stringCouponType);
            List<Coupon> couponList = customerService.getAllAvailableCouponsByType(enumType);
            if (couponList != null ){
                return new ResponseEntity<>(couponList , HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Couldn't get coupons" , HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getAllPurchasedCoupons")
    public ResponseEntity<?> getAllPurchasedCoupons() throws Exception{
        CustomerService customerService = getService();
        if(customerService != null){
            List<Coupon> couponList = customerService.getAllPurchaseCoupons();
            if (couponList != null ){
                return new ResponseEntity<>(couponList , HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Couldn't get coupons" , HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }


}
