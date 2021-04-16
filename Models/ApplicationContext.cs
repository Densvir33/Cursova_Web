using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Entities
{
    public class ApplicationContext : IdentityDbContext<User>
    {

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
        public virtual DbSet<UserInfo> UserInfos { get; set; }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Discount> Discounts { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Requirement> Requirements { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasOne(ui => ui.UserInfo)
                .WithOne(u => u.User)
                .HasForeignKey<UserInfo>();

            builder.Entity<ProductDiscount>()
           .HasKey(t => new { t.ProductId, t.DiscountId });

            builder.Entity<ProductDiscount>()
                .HasOne(pt => pt.Product)
                .WithMany(p => p.ProductDiscount)
                .HasForeignKey(pt => pt.ProductId);

            builder.Entity<ProductDiscount>()
                .HasOne(pt => pt.Discount)
                .WithMany(t => t.ProductDiscount)
                .HasForeignKey(pt => pt.DiscountId);



            builder.Entity<ProductRequirements>()
           .HasKey(t => new { t.ProductId, t.RequirementId });

            builder.Entity<ProductRequirements>()
                .HasOne(pt => pt.Product)
                .WithMany(p => p.ProductRequirements)
                .HasForeignKey(pt => pt.ProductId);

            builder.Entity<ProductRequirements>()
                .HasOne(pt => pt.Requirement)
                .WithMany(t => t.ProductRequirements)
                .HasForeignKey(pt => pt.RequirementId);









            base.OnModelCreating(builder);
        }

    }
}
