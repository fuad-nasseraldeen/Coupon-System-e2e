package com.coupon.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long companyId;

    private String compName;

    private String password;

    private String email;

    @ToString.Exclude
    @OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
    @JoinTable(
            name = "Company_Coupon",
            joinColumns = { @JoinColumn(name= "company_id") },
            inverseJoinColumns = { @JoinColumn(name = "coupon_id") }
    )
    private List<Coupon> coupons = new ArrayList<>();

}
