using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Products_Api.Models
{
    public partial class ShoppingDBContext : DbContext
    {
        public ShoppingDBContext()
        {
        }

        public ShoppingDBContext(DbContextOptions<ShoppingDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<ProductsCategory> ProductsCategory { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Products>(entity =>
            {
                entity.HasKey(e => e.ProductId)
                    .HasName("PK__Products__9834FBBA7F60ED59");

                entity.Property(e => e.ProductId).HasColumnName("Product_Id");

                entity.Property(e => e.ProductBrand)
                    .HasColumnName("Product_Brand")
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.ProductCategoryId).HasColumnName("Product_Category_Id");

                entity.Property(e => e.ProductName)
                    .HasColumnName("Product_Name")
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.ProductPrice)
                    .HasColumnName("Product_Price")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.ProductQtyAvailable).HasColumnName("Product_Qty_Available");

                entity.HasOne(d => d.ProductCategory)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.ProductCategoryId)
                    .HasConstraintName("FK__Products__Produc__0519C6AF");
            });

            modelBuilder.Entity<ProductsCategory>(entity =>
            {
                entity.HasKey(e => e.CategoryId)
                    .HasName("PK__Products__6DB38D6E03317E3D");

                entity.ToTable("Products_Category");

                entity.HasIndex(e => e.CategoryName)
                    .HasName("UQ__Products__B35EB4191BFD2C07")
                    .IsUnique();

                entity.Property(e => e.CategoryId).HasColumnName("Category_Id");

                entity.Property(e => e.CategoryName)
                    .HasColumnName("Category_Name")
                    .HasMaxLength(60)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
