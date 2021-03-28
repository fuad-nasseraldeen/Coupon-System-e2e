package com.coupon.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
public class Coupon {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    private Date startDate;

    private Date endDate;

    private  int amount;

    @Enumerated(EnumType.STRING)
    private CouponType type;

    private String message;

    private double price;

    private String image;

    private  long companyId;

    private boolean isActive;
    
//    /**
//	 * Each coupon has customer and each customer can had a coupon so we needed to create another table each one with own id.
//	 * Table name is customer_coupon.<br>
//	 * Eager - Initialize all his customers when we load a coupon.<br>
//	 * Refresh - Refresh the data in the object, may override changes made to the entity (sync from DB). <br>
//	 * Merge - Merge the existing data from the table in the DB with the data in my object (sync to DB). <br>
//	 * Detach - Unflushed changes made to the entity if any (including removal of the entity), will not be synchronized to the database.
//	 */
//	@ManyToMany(fetch=FetchType.EAGER, cascade = {CascadeType.DETACH , CascadeType.MERGE, CascadeType.REFRESH})
//	@JoinTable(name = "customer_coupon",
//				joinColumns = @JoinColumn(name = "coupon_id"),
//				inverseJoinColumns = @JoinColumn(name = "customer_id"))
//	private List<Customer> customers;
}
