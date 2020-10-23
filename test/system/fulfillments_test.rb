require "application_system_test_case"

class FulfillmentsTest < ApplicationSystemTestCase
  setup do
    @fulfillment = fulfillments(:one)
  end

  test "visiting the index" do
    visit fulfillments_url
    assert_selector "h1", text: "Fulfillments"
  end

  test "creating a Fulfillment" do
    visit fulfillments_url
    click_on "New Fulfillment"

    click_on "Create Fulfillment"

    assert_text "Fulfillment was successfully created"
    click_on "Back"
  end

  test "updating a Fulfillment" do
    visit fulfillments_url
    click_on "Edit", match: :first

    click_on "Update Fulfillment"

    assert_text "Fulfillment was successfully updated"
    click_on "Back"
  end

  test "destroying a Fulfillment" do
    visit fulfillments_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Fulfillment was successfully destroyed"
  end
end
