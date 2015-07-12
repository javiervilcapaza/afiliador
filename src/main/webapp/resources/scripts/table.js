$(function() {

	$("#tabla")
			.dataTable(
					{
						 "bPaginate": true,
		                    "bLengthChange": false,
		                    "bFilter": false,
		                    "bSort": true,
		                    "bInfo": true,
		                    "bAutoWidth": false
		            });
});