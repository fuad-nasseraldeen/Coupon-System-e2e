package com.coupon.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.coupon.entity.Contact;



@Repository
public interface ContactRepository extends CrudRepository<Contact, Long> {
	
	
}
