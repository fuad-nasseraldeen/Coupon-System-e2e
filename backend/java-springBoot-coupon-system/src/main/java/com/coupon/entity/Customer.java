package com.coupon.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String customerName;

    private String password;
    
    /**
	 * Each customer can purchase many coupons and each coupon can be purchased a different customers so we needed to create another table each one with own id.
	 * Table name is customer_coupon.<br>
	 * Eager - Initialize all his coupons when we load a customer.<br>
	 * Refresh - Refresh the data in the object, may override changes made to the entity (sync from DB). <br>
	 * Merge - Merge the existing data from the table in the DB with the data in my object (sync to DB). <br>
	 * Detach - Unflushed changes made to the entity if any (including removal of the entity), will not be synchronized to the database.
	 */
    @ToString.Exclude
    @OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
    @JoinTable(
            name = "Customer_Coupon",
            joinColumns = { @JoinColumn(name= "customer_id") },
            inverseJoinColumns = { @JoinColumn(name = "coupon_id") })
    private List<Coupon> coupons = new ArrayList<>();

}
