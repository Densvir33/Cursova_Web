using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class add_some : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "UserInfos");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "UserInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Number",
                table: "UserInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "UserInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "UserInfos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "UserInfos");

            migrationBuilder.DropColumn(
                name: "Number",
                table: "UserInfos");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "UserInfos");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "UserInfos");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "UserInfos",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
