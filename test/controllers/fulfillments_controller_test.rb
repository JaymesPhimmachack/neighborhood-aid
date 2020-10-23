require 'test_helper'

class FulfillmentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @fulfillment = fulfillments(:one)
  end

  test "should get index" do
    get fulfillments_url
    assert_response :success
  end

  test "should get new" do
    get new_fulfillment_url
    assert_response :success
  end

  test "should create fulfillment" do
    assert_difference('Fulfillment.count') do
      post fulfillments_url, params: { fulfillment: {  } }
    end

    assert_redirected_to fulfillment_url(Fulfillment.last)
  end

  test "should show fulfillment" do
    get fulfillment_url(@fulfillment)
    assert_response :success
  end

  test "should get edit" do
    get edit_fulfillment_url(@fulfillment)
    assert_response :success
  end

  test "should update fulfillment" do
    patch fulfillment_url(@fulfillment), params: { fulfillment: {  } }
    assert_redirected_to fulfillment_url(@fulfillment)
  end

  test "should destroy fulfillment" do
    assert_difference('Fulfillment.count', -1) do
      delete fulfillment_url(@fulfillment)
    end

    assert_redirected_to fulfillments_url
  end
end
