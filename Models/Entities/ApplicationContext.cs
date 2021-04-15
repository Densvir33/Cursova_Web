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
        public virtual DbSet<UserAdditionalInfo> UserAdditionalInfos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasOne(ui => ui.UserAdditionalInfo)
                .WithOne(u => u.User)
                .HasForeignKey<UserAdditionalInfo>();

            base.OnModelCreating(builder);
        }

    }
}
