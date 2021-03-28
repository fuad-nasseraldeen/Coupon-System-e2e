package com.coupon.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coupon.entity.Company;

@Repository
public interface CompanyRepository extends JpaRepository <Company , Long> {


    public Company findByCompanyId (long companyId);

    public Company findByCompNameAndPassword (String companyName, String password);

}
