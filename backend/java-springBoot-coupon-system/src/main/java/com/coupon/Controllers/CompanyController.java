package com.coupon.Controllers;

import com.coupon.Services.CompanyService;
import com.coupon.Utilities.DateConverters;
import com.coupon.Utilities.LoginMethod;
import com.coupon.entity.Company;
import com.coupon.entity.Coupon;
import com.coupon.entity.CouponType;
import com.coupon.entity.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private HttpServletRequest request;

    private CompanyService getService() throws  Exception {
        try {
            CompanyService companyService = null;
            companyService = (CompanyService) request.getSession(false).getAttribute("service");
            return companyService;
        } catch (Exception ex){
            System.out.println(ex.getMessage());
            return null;
        }
    }

    @GetMapping("/getCoupon/{couponId}")
    public ResponseEntity<?> getCouponById(@PathVariable("couponId") long couponId) throws Exception {
        CompanyService companyService = getService();
        if(companyService != null) {
            Coupon coupon = companyService.getCoupon(couponId);
            if(coupon != null) {
                return new ResponseEntity<>(coupon, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("This company don't own this coupon" , HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getAllCompanyCoupons")
    public ResponseEntity<?> getAllCompanyCoupons() throws Exception{
        CompanyService companyService = getService();
        if(companyService != null) {
            List<Coupon> coupons = companyService.getAllCompanyCoupons();
            return new ResponseEntity<>(coupons , HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/addCoupon")
    public ResponseEntity<?> addCoupon(@RequestBody Coupon coupon)throws Exception{
        CompanyService companyService = getService();
        if(companyService != null ){

            Coupon couponToAdd = new Coupon();
         
            if (coupon.getTitle() != null && coupon.getTitle() != "") {
                couponToAdd.setTitle(coupon.getTitle());
            } else {
                return new ResponseEntity<>("Invalid coupon title!",HttpStatus.BAD_REQUEST);
            }
            if (coupon.getAmount() > 0) {
                couponToAdd.setAmount(coupon.getAmount());
            } else {
                return new ResponseEntity<>("Invalid coupon amount!",HttpStatus.BAD_REQUEST);
            }
            if (coupon.getType() != null) {
                couponToAdd.setType(coupon.getType());
            } else {
                return new ResponseEntity<>("Invalid coupon type",HttpStatus.BAD_REQUEST);
            }
            if (coupon.getMessage() != null && coupon.getMessage() != "") {
                couponToAdd.setMessage(coupon.getMessage());
            } else {
                return new ResponseEntity<>("Invalid coupon message",HttpStatus.BAD_REQUEST);
            }
            if (coupon.getPrice() > 0) {
                couponToAdd.setPrice(coupon.getPrice());
            } else {
                return new ResponseEntity<>("Invalid coupon price!",HttpStatus.BAD_REQUEST);
            }
            if (coupon.getImage() != null && coupon.getImage() != "") {
                couponToAdd.setImage(coupon.getImage());
            } else {
                return new ResponseEntity<>("Invalid coupon image!",HttpStatus.BAD_REQUEST);
            }
            System.out.println(companyService.getCompany());
            couponToAdd.setCompanyId(companyService.getCompany().getCompanyId());
            
            couponToAdd.setStartDate(DateConverters.getCurrentDate());
            System.out.println(DateConverters.getCurrentDate());
            System.out.println(coupon.getEndDate());
            if(!coupon.getEndDate().before(DateConverters.getCurrentDate())){
            	couponToAdd.setEndDate(coupon.getEndDate());
            }else {
            	return new ResponseEntity<>("Invalid end date!",HttpStatus.BAD_REQUEST);
            }
            
            couponToAdd.setActive(true);

            if(couponToAdd != null){
                companyService.addCoupon(couponToAdd);
                return new ResponseEntity<>("Coupon Added Successfully " ,HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to add new Coupon !",HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }


    @PostMapping("/updateCoupon/{couponId}")
    public ResponseEntity<?> updateCoupon(@PathVariable("couponId") long couponId , @RequestBody Coupon coupon) throws Exception {
        CompanyService companyService = getService();
        if(companyService != null){
            Coupon couponToUpdate = companyService.getCoupon(couponId);
            if(couponToUpdate != null){
                if (coupon.getTitle() != null && coupon.getTitle() != "") {
                    couponToUpdate.setTitle(coupon.getTitle());
                }
                if (coupon.getAmount() > 0) {
                    couponToUpdate.setAmount(coupon.getAmount());
                }
                if (coupon.getType() != null) {
                    couponToUpdate.setType(coupon.getType());
                }
                if (coupon.getMessage() != null && coupon.getMessage() != "") {
                    couponToUpdate.setMessage(coupon.getMessage());
                }
                if (coupon.getPrice() > 0) {
                    couponToUpdate.setPrice(coupon.getPrice());
                }
                if (coupon.getImage() != null && coupon.getImage() != "") {
                    couponToUpdate.setImage(coupon.getImage());
                }
                companyService.updateCoupon(couponToUpdate);
                return new ResponseEntity<>("Coupon Updated Successfully" ,HttpStatus.OK);
            }else {
                return new ResponseEntity<>("This company don't own this coupon" , HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/removeCoupon/{couponId}")
    public ResponseEntity<?> removeCoupon(@PathVariable("couponId") long couponId) throws Exception {
        CompanyService companyService = getService();
        if(companyService != null){
            Coupon couponToRemove = companyService.getCoupon(couponId);
            if (couponToRemove != null){
                companyService.removeCoupon(couponToRemove);
                return new ResponseEntity<>("Coupon Removed Successfully" ,HttpStatus.OK);
            }else {
                return new ResponseEntity<>("This company don't own this coupon" , HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>("Unauthorized" , HttpStatus.UNAUTHORIZED);
        }
     }

    }
