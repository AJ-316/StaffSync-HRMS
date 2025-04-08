import React from 'react'
import './AboutUs.css' // Import the CSS file

const links = [
  { name: 'Open Positions', href: '/jobs' },
  { name: 'Internship Program', href: '/jobs?type=internship' },
  { name: 'Our Values', href: '/about' },
  { name: 'Leadership Team', href: '/employees' },
]

const stats = [
  { name: 'Employees', value: '300+' },
  { name: 'Active Employers', value: '120+' },
  { name: 'Job Seekers', value: '4,500+' },
  { name: 'Cities Covered', value: '75+' },
]

export default function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h2>About Us</h2>
        <p>
          Our mission is to revolutionize HR by connecting talent with opportunity.
          From job seekers to employers, we simplify every step of the hiring and employment journey.
        </p>
      </div>

      <div className="about-links">
        {links.map((link) => (
          <a key={link.name} href={link.href} className="about-link">
            {link.name} →
          </a>
        ))}
      </div>

      <div className="about-stats">
        {stats.map((stat) => (
          <div key={stat.name} className="stat-box">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-name">{stat.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}