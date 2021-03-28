package com.coupon.Controllers;


import com.coupon.Services.CouponClient;
import com.coupon.Utilities.LoginMethod;
import com.coupon.entity.ClientType;
import com.coupon.entity.Coupon;
import com.coupon.entity.UserLogin;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@RestController
public class LoginController {

    @Autowired
    private LoginMethod loginMethod;

    @Autowired
    private HttpServletRequest request;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLogin userLogin) throws Exception {

            String type = userLogin.getType();
            ClientType clientType = ClientType.valueOf(type);

            CouponClient service = loginMethod.login(userLogin.getUsername(), userLogin.getPassword(), clientType);

             HttpSession session = request.getSession(false);
         

            if (session != null) {
                session.invalidate(); // killing the session if exist
            }

            request.getSession(true); // // create a new session for a new client
            if (service != null) {

                // updating the session with the login facade
                request.getSession().setAttribute("service", service);

                Cookie cookie = new Cookie("Set-Cookie" , "JSESSIONID="+request.getSession().getId()+";path=/; HttpOnly; domain=/localhost; secure=false;" );
                cookie.setComment(type);
                String goodResponse = new Gson().toJson(cookie);

                switch (clientType) {
                    case ADMIN:
                        return new ResponseEntity<>(goodResponse, HttpStatus.OK);
                    case COMPANY:
                        return new ResponseEntity<>(goodResponse, HttpStatus.OK);

                    case CUSTOMER:
                        return new ResponseEntity<>(goodResponse, HttpStatus.OK);
                }
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }





}
