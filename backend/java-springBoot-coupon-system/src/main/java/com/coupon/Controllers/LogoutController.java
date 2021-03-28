package com.coupon.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@RestController
public class LogoutController {

    @Autowired
    private HttpServletRequest request;

    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        try {
            HttpSession session = request.getSession();
            session.removeAttribute("service");
            session.invalidate();
            System.out.println("Logout successed..");
            return new ResponseEntity<>("You logged out successfully !", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>("Could not log out " ,HttpStatus.BAD_REQUEST);
        }
    }

    }




